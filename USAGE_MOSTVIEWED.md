# MostViewed Component Usage Guide

The `MostViewed` component displays a list of articles with titles on the left and square thumbnail images on the right.

## Basic Usage

```tsx
import { MostViewed } from '@/components';

function MyComponent() {
  const articles = [
    {
      id: 1,
      title: 'Your TV Sounds Awful. These Soundbars Can Fix That',
      href: '/posts/soundbars-guide',
      imageUrl: 'https://example.com/image.jpg',
      imageAlt: 'Soundbar setup',
    },
    // ... more articles
  ];

  return (
    <Box bg="brand.black" p={8}>
      <MostViewed items={articles} maxItems={4} />
    </Box>
  );
}
```

## Props

### MostViewedProps

- `title?: string` - Section title (default: "Most viewed")
- `items?: MostViewedItem[]` - Array of articles to display
- `isLoading?: boolean` - Shows skeleton loaders when true
- `maxItems?: number` - Limits the number of items displayed

### MostViewedItem

```typescript
interface MostViewedItem {
  id: string | number;
  title: string;
  href: string;
  imageUrl: string;
  imageAlt?: string;
}
```

## Converting Posts to MostViewedItems

If you have Post data from your API, you can convert it to the MostViewedItem format:

```tsx
import { MostViewed } from '@/components';
import type { Post } from '@/lib/types';

function MostViewedPosts({ posts }: { posts: Post[] }) {
  const items = posts.map(post => ({
    id: post.id,
    title: post.attributes.title,
    href: `/post/${post.id}`,
    imageUrl: post.attributes.coverImg.data.attributes.url || '',
    imageAlt:
      post.attributes.coverImg.data.attributes.name || post.attributes.title,
  }));

  return <MostViewed items={items} maxItems={4} />;
}
```

## Features

### Design

- White text on dark background
- Title on left, square thumbnail (56x56px) on right
- Horizontal divider lines between items
- Hover effects for better UX
- Skeleton loading state

### Accessibility

- Semantic HTML (`<aside>`, `<article>`)
- ARIA labels
- Keyboard navigation support
- Proper heading hierarchy

### Styling

- Uses Chakra UI v3 components
- Responsive layout
- Brand colors (brand.white, brand.black, brand.gray.light)
- Smooth transitions on hover

## Example with Loading State

```tsx
<MostViewed items={articles} isLoading={loading} maxItems={4} />
```

## Complete Example

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { MostViewed } from '@/components';
import { fetchPosts } from '@/lib/api';

export function MostViewedSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMostViewed = async () => {
      setLoading(true);
      const data = await fetchPosts(0, 4);
      setPosts(data.data);
      setLoading(false);
    };
    loadMostViewed();
  }, []);

  const items = posts.map(post => ({
    id: post.id,
    title: post.attributes.title,
    href: `/post/${post.id}`,
    imageUrl: post.attributes.coverImg.data.attributes.url || '',
    imageAlt: post.attributes.title,
  }));

  return (
    <Box bg="brand.black" p={8} maxW="400px">
      <MostViewed items={items} isLoading={loading} maxItems={4} />
    </Box>
  );
}
```

## Styling Customization

The component uses these design tokens:

- Background: `brand.black`
- Text: `brand.white`
- Dividers: `brand.gray.light` (with opacity)
- Hover: Opacity transition

You can wrap the component in a Box to change the background:

```tsx
<Box bg="brand.green">
  <MostViewed items={items} />
</Box>
```
