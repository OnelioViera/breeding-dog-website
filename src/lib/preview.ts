/**
 * Payload Live Preview Integration
 * This handles the postMessage communication from Payload admin panel
 */

export function setupPayloadPreview() {
  if (typeof window === 'undefined') return;

  // Listen for preview updates from Payload
  window.addEventListener('message', (event) => {
    // Verify origin for security (adjust if needed)
    if (event.origin !== 'http://localhost:3001') {
      return;
    }

    const { type, payload } = event.data;

    if (type === 'payload-live-preview') {
      // Handle preview data updates
      // You can use this to update your components with draft data
      console.log('Preview update received:', payload);
      
      // Example: Update the page with preview data
      // This would require implementing a preview data context/provider
      // For now, the preview will show the current published content
    }
  });
}

// Initialize preview on page load
if (typeof window !== 'undefined') {
  setupPayloadPreview();
}

