const API_URL = import.meta.env.VITE_PAYLOAD_API_URL || 'http://localhost:3001/api';

export interface Puppy {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: string;
  price: string;
  image: string;
  available: boolean;
  litter?: string;
  description?: string;
  inquiryModalTitle?: string;
  inquiryModalDescription?: string;
  inquiryModalFooterText?: string;
}

export interface NavbarDropdownItem {
  title: string;
  linkType?: 'page' | 'custom' | 'section';
  page?: string | { id: string; slug: string };
  link?: string;
  openInNewTab?: boolean;
}

export interface NavbarDropdownData {
  buttonTitle: string;
  showAvailablePuppies: boolean;
  availablePuppiesLabel: string;
  customItems?: NavbarDropdownItem[];
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string | { url: string };
  description?: string;
  category?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function getPuppies(): Promise<Puppy[]> {
  try {
    const response = await fetch(`${API_URL}/puppies?limit=100&depth=2`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Failed to fetch puppies: ${response.status}`);
    }
    const data = await response.json();
    console.log('Raw API response:', data); // Debug: log raw response
    const serverURL = import.meta.env.VITE_PAYLOAD_API_URL?.replace('/api', '') || 'http://localhost:3001';
    
    if (!data.docs || data.docs.length === 0) {
      console.log('No puppies found in API response');
      return [];
    }
    
    return data.docs.map((puppy: any) => {
      // Handle image - Payload media objects need full URL construction
      let imageUrl = '';
      if (typeof puppy.image === 'string') {
        imageUrl = puppy.image;
      } else if (puppy.image && typeof puppy.image === 'object') {
        // Payload media object - construct full URL
        if (puppy.image.url) {
          // If url is already a full URL, use it directly
          imageUrl = puppy.image.url.startsWith('http') 
            ? puppy.image.url 
            : `${serverURL}${puppy.image.url.startsWith('/') ? '' : '/'}${puppy.image.url}`;
        } else if (puppy.image.filename) {
          // Construct URL from filename
          imageUrl = `${serverURL}/media/${puppy.image.filename}`;
        } else if (puppy.image.id) {
          // Fallback: use media ID
          imageUrl = `${serverURL}/api/media/${puppy.image.id}`;
        }
      }
      
      // Log for debugging
      console.log('Processing puppy:', {
        id: puppy.id,
        name: puppy.name,
        imageObject: puppy.image,
        constructedUrl: imageUrl
      });
      
      return {
        id: puppy.id,
        name: puppy.name || 'Unnamed Puppy',
        breed: puppy.breed || 'Australian Labradoodle',
        age: puppy.age || '',
        gender: puppy.gender || '',
        price: puppy.price || '',
        image: imageUrl,
        available: puppy.available !== undefined ? puppy.available : true,
        litter: puppy.litter,
        description: puppy.description,
        inquiryModalTitle: puppy.inquiryModalTitle,
        inquiryModalDescription: puppy.inquiryModalDescription,
        inquiryModalFooterText: puppy.inquiryModalFooterText,
      };
    });
  } catch (error) {
    console.error('Error fetching puppies:', error);
    return [];
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const response = await fetch(`${API_URL}/gallery?limit=100&depth=2`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Failed to fetch gallery images: ${response.status}`);
    }
    const data = await response.json();
    console.log('Raw gallery API response:', data); // Debug log
    const serverURL = import.meta.env.VITE_PAYLOAD_API_URL?.replace('/api', '') || 'http://localhost:3001';
    
    if (!data.docs || data.docs.length === 0) {
      console.log('No gallery images found in API response');
      return [];
    }
    
    return data.docs.map((item: any) => {
      // Handle image - Payload media objects need full URL construction
      let imageUrl = '';
      if (typeof item.image === 'string') {
        imageUrl = item.image;
      } else if (item.image && typeof item.image === 'object') {
        // Payload media object - construct full URL
        if (item.image.url) {
          // If url is already a full URL, use it directly
          imageUrl = item.image.url.startsWith('http') 
            ? item.image.url 
            : `${serverURL}${item.image.url.startsWith('/') ? '' : '/'}${item.image.url}`;
        } else if (item.image.filename) {
          // Construct URL from filename
          imageUrl = `${serverURL}/media/${item.image.filename}`;
        } else if (item.image.id) {
          // Fallback: use media ID
          imageUrl = `${serverURL}/api/media/${item.image.id}`;
        }
      }
      
      return {
        id: item.id,
        title: item.title || 'Gallery Image',
        image: imageUrl,
        description: item.description,
        category: item.category,
      };
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

export async function submitContact(data: ContactSubmission): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error('Error submitting contact:', error);
    return false;
  }
}

export async function getNavbarDropdownData(): Promise<NavbarDropdownData | null> {
  try {
    // Fetch with depth=3 to ensure page relationships are fully populated
    const response = await fetch(`${API_URL}/globals/navbar-dropdown?depth=3`);
    if (!response.ok) {
      throw new Error('Failed to fetch navbar dropdown data');
    }
    const data = await response.json();
    console.log('Raw navbar dropdown API response:', data); // Debug log
    console.log('Custom items in response:', data.customItems); // Debug log
    
    // Payload globals return the data directly, not wrapped
    // Handle both possible response structures
    const globalData = data || {};
    
    // Ensure customItems is an array and properly formatted
    let customItems: NavbarDropdownItem[] = [];
    if (globalData.customItems && Array.isArray(globalData.customItems)) {
      customItems = globalData.customItems.map((item: any, index: number) => {
        console.log(`Processing custom item ${index}:`, item); // Debug log
        
        // Handle page relationship - if page is selected, use its slug
        let link = item.link || '';
        let title = item.title || '';
        
        if (item.linkType === 'page' && item.page) {
          console.log('Item has page relationship:', item.page); // Debug log
          
          // If page is populated (object with slug), use the slug
          if (typeof item.page === 'object') {
            if (item.page.slug) {
              // Ensure the link starts with / for relative paths
              link = item.page.slug.startsWith('/') ? item.page.slug : `/${item.page.slug}`;
              console.log('Using page slug for link:', link); // Debug log
            }
            // Use page title if no custom title provided
            if (!title && item.page.title) {
              title = item.page.title;
              console.log('Using page title:', title); // Debug log
            }
          } else if (typeof item.page === 'string') {
            // If it's just an ID, we need to fetch the page
            console.warn('Page relationship is just an ID, not populated. ID:', item.page);
            // Try to fetch the page or skip this item
            // For now, we'll skip items with unpopulated page IDs
            return null;
          }
        } else if (item.linkType === 'section' && item.link) {
          // Ensure section links start with #
          link = item.link.startsWith('#') ? item.link : `#${item.link}`;
        } else if (item.linkType === 'custom' && item.link) {
          // Ensure custom links that are relative paths start with /
          if (!item.link.startsWith('http') && !item.link.startsWith('/') && !item.link.startsWith('#')) {
            link = `/${item.link}`;
          } else {
            link = item.link;
          }
        }
        
        const result = {
          title: title,
          linkType: item.linkType || 'custom',
          page: item.page,
          link: link,
          openInNewTab: item.openInNewTab || false,
        };
        
        console.log('Processed item result:', result); // Debug log
        return result;
      }).filter((item: NavbarDropdownItem | null) => {
        // Filter out null items and items without required data
        if (!item) return false;
        if (!item.title) return false;
        if (item.linkType === 'page' && !item.link) return false;
        if (item.linkType !== 'page' && !item.link) return false;
        return true;
      }) as NavbarDropdownItem[];
      
      console.log('Final custom items:', customItems); // Debug log
    }
    
    return {
      buttonTitle: globalData.buttonTitle || 'Puppies',
      showAvailablePuppies: globalData.showAvailablePuppies !== undefined ? globalData.showAvailablePuppies : true,
      availablePuppiesLabel: globalData.availablePuppiesLabel || 'Available Puppies',
      customItems: customItems,
    };
  } catch (error) {
    console.error('Error fetching navbar dropdown data:', error);
    return null;
  }
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content?: any;
  metaDescription?: string;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    // URL encode the slug to handle special characters
    const encodedSlug = encodeURIComponent(slug);
    const url = `${API_URL}/pages?where[slug][equals]=${encodedSlug}&limit=1`;
    console.log('Fetching page with slug:', slug);
    console.log('API URL:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch page:', response.status, errorText);
      throw new Error(`Failed to fetch page: ${response.status}`);
    }
    const data = await response.json();
    console.log('Page API response:', data);
    
    if (data.docs && data.docs.length > 0) {
      const page = {
        id: data.docs[0].id,
        title: data.docs[0].title,
        slug: data.docs[0].slug,
        content: data.docs[0].content,
        metaDescription: data.docs[0].metaDescription,
      };
      console.log('Found page:', page);
      return page;
    }
    console.log('No page found with slug:', slug);
    return null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function getAllPages(): Promise<Page[]> {
  try {
    const response = await fetch(`${API_URL}/pages?limit=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }
    const data = await response.json();
    return (data.docs || []).map((page: any) => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      content: page.content,
      metaDescription: page.metaDescription,
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

