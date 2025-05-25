# Image Upload Feature

This document describes the image upload functionality implemented for the admin panel.

## Features

### 1. Image Upload with Optimization

- **Drag & Drop Support**: Users can drag and drop images directly onto the upload area
- **File Browser**: Click to browse and select files from the file system
- **Automatic Optimization**: Images are automatically optimized for both web and PDF display
- **Multiple Format Support**: JPG, PNG, WebP, and GIF formats are supported
- **File Size Validation**: Maximum file size of 5MB enforced
- **Real-time Preview**: Instant preview of uploaded images

### 2. External URL Support

- **URL Input**: Support for external image URLs (e.g., from image hosting services)
- **Automatic Detection**: System automatically detects whether an image is local or external
- **Flexible Storage**: External URLs are stored as-is, local images use relative paths

### 3. Image Optimization

- **Web Version**: 400x400px, WebP format, 85% quality for web display
- **PDF Version**: 200x200px, WebP format, 80% quality for PDF generation
- **Smart Cropping**: Images are cropped to square format with center positioning
- **Performance**: Optimized file sizes for fast loading

## Technical Implementation

### API Endpoints

#### `/api/upload` (POST)

Handles image upload and optimization:

```typescript
// Request: FormData with 'file' field
// Response: { success: boolean, webUrl: string, pdfUrl: string, message: string }
```

#### `/api/upload` (DELETE)

Handles deletion of uploaded images:

```typescript
// Request: Query params 'webUrl' and 'pdfUrl'
// Response: { success: boolean, message: string }
```

### File Structure

```
public/
  uploads/
    profile-{timestamp}-web.webp    # Web optimized version
    profile-{timestamp}-pdf.webp    # PDF optimized version
```

### Data Structure

```typescript
interface UserProfile {
  profileImageUrl: string; // Main image URL (web version for local, original for external)
  profileImageWebUrl?: string; // Web optimized version URL
  profileImagePdfUrl?: string; // PDF optimized version URL
}
```

### Helper Functions

#### `getProfileImageUrl(profile, context)`

Returns the appropriate image URL based on context:

- `context: 'web'` - Returns web-optimized version
- `context: 'pdf'` - Returns PDF-optimized version
- Falls back to main profile image URL

#### `validateImageFile(file)`

Validates image files:

- File type validation (must be image/\*)
- File size validation (max 5MB)
- Format validation (JPG, PNG, WebP, GIF)

## Usage Examples

### In Admin Panel

The image upload component is automatically integrated into the Profile Data tab:

```tsx
<ImageUpload
  currentImageUrl={profileData.profileImageUrl || ""}
  currentWebUrl={profileData.profileImageWebUrl}
  currentPdfUrl={profileData.profileImagePdfUrl}
  onImageChange={(imageUrl, webUrl, pdfUrl) => {
    // Update profile data with new image URLs
  }}
/>
```

### In Frontend Components

Use the helper function to get optimized images:

```tsx
import { getProfileImageUrl } from '@/lib/image-utils';

// For web display
<Image src={getProfileImageUrl(userProfile, 'web')} />

// For PDF generation
<Image src={getProfileImageUrl(userProfile, 'pdf')} />
```

## Security Considerations

1. **File Type Validation**: Only image files are accepted
2. **File Size Limits**: 5MB maximum to prevent abuse
3. **Development Only**: Upload API only works in development mode
4. **Path Sanitization**: File paths are sanitized to prevent directory traversal

## Error Handling

The system provides comprehensive error handling:

- Invalid file types
- File size exceeded
- Upload failures
- Network errors
- File deletion errors

All errors are displayed to users via toast notifications with clear, actionable messages.

## Browser Compatibility

- **Drag & Drop**: Supported in all modern browsers
- **File API**: Requires modern browser support for File API
- **WebP Format**: Falls back gracefully in older browsers
- **Image Optimization**: Server-side processing ensures compatibility

## Performance Benefits

1. **Reduced Loading Times**: Optimized image sizes
2. **Better User Experience**: Faster page loads
3. **Mobile Optimization**: Smaller images for mobile devices
4. **PDF Generation**: Optimized images for PDF export
5. **Storage Efficiency**: Compressed images save disk space
