# Components Guide

This guide documents the UI components built following Atomic Design principles.

## Overview

All components are built with:

- **Chakra UI v3** for styling and accessibility
- **TypeScript** for type safety
- **React** for composability
- **Brand colors**: Primary `#0d6efd`, supporting semantic tokens

## Atoms

### Button

Primary button component with multiple variants.

```tsx
import { Button } from '@/components';

<Button variant="primary" size="lg">Click me</Button>
<Button variant="black" size="sm">Small Black</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link" href="/">Link Button</Button>
```

**Props:**

- `variant`: `'primary' | 'black' | 'ghost' | 'link'`
- `size`: `'lg' | 'sm'`
- `isLoading`: boolean
- `disabled`: boolean

### InputA

Form input with error states and addons support.

```tsx
import { InputA } from '@/components';

<InputA placeholder="Enter text" />
<InputA invalid errorText="Error message" />
<InputA disabled />
<InputA leftAddon="@ rightAddon=".com" />
```

**Props:**

- `invalid`: boolean
- `leftAddon`: ReactNode
- `rightAddon`: ReactNode
- All standard Chakra Input props

### TextareaA

Text area component with validation states.

```tsx
import { TextareaA } from '@/components';

<TextareaA placeholder="Enter description" />
<TextareaA invalid />
```

**Props:**

- `invalid`: boolean
- All standard Chakra Textarea props

### FormLabelA

Form label with required indicator.

```tsx
import { FormLabelA } from '@/components';

<FormLabelA required>Email</FormLabelA>;
```

### HelperTextA

Helper text or error message.

```tsx
import { HelperTextA } from '@/components';

<HelperTextA text="Helper message" />
<HelperTextA errorText="Error message" isInvalid />
```

### TagPill

Tag/pill component for selections.

```tsx
import { TagPill } from '@/components';

<TagPill label="Technology" isSelected onClick={handleClick} />
<TagPill label="Design" showClose onClose={handleClose} />
```

**Props:**

- `label`: string
- `isSelected`: boolean
- `onClick`: () => void
- `showClose`: boolean
- `onClose`: () => void

## Molecules

### FormField

Composed form field with label, input/control, and helper text.

```tsx
import { FormField } from '@/components';
import { InputA } from '@/components';

<FormField
  id="email"
  label="Email"
  required
  errorText={errors.email?.message}
  helperText="Enter your email address"
>
  <InputA placeholder="email@example.com" />
</FormField>;
```

**Props:**

- `id`: string
- `label`: string
- `required`: boolean
- `errorText`: string
- `helperText`: string
- `children`: ReactNode (Input or Textarea component)

### TextAreaWithSideButton

Input field with attached button.

```tsx
import { TextAreaWithSideButton } from '@/components';

<TextAreaWithSideButton
  id="size-input"
  label="Size"
  placeholder="Enter size"
  buttonLabel="Large"
  size="lg"
  onButtonClick={() => console.log('Clicked')}
  onChange={value => setValue(value)}
/>;
```

**Props:**

- `id`: string
- `label`: string
- `placeholder`: string
- `value`: string
- `onChange`: (value: string) => void
- `buttonLabel`: string
- `onButtonClick`: () => void
- `size`: `'sm' | 'lg'`
- `isDisabled`: boolean
- `isInvalid`: boolean
- `helperText`: string

### TopicsCheckboxGroup

Multi-select chip group with "All" logic.

```tsx
import { TopicsCheckboxGroup } from '@/components';

const topics = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Technology' },
  { id: 'design', label: 'Design' },
];

<TopicsCheckboxGroup
  options={topics}
  value={selectedIds}
  onChange={setSelectedIds}
  showCloseOnSelected
/>;
```

**Props:**

- `options`: `Array<{ id: string; label: string }>`
- `value`: `string[]`
- `onChange`: `(ids: string[]) => void`
- `showCloseOnSelected`: boolean

**Behavior:**

- Selecting "All" sets value to `['all']`
- Selecting specific topics removes "all"
- Multiple specific topics can be selected
- Close button (×) removes individual topics

## Organisms

### LoaderBar

Progress bar with loading, error, and success states.

```tsx
import { LoaderBar } from '@/components';

<LoaderBar
    state="loading"
    label="Uploading..."
    value={60}
    onCancel={() => setState('idle')}
/>

<LoaderBar
    state="error"
    onRetry={handleRetry}
/>

<LoaderBar
    state="success"
    onDone={() => setOpen(false)}
/>
```

**Props:**

- `state`: `'idle' | 'loading' | 'error' | 'success'`
- `label`: string
- `value`: number (0-100, for loading state)
- `onCancel`: () => void
- `onRetry`: () => void
- `onDone`: () => void

### UploadPostModal

Three-state modal for uploading posts.

```tsx
import { UploadPostModal } from '@/components';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async (payload: { title: string; file: File }) => {
    // Upload to backend
    await uploadToServer(payload);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Upload</Button>
      <UploadPostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleUpload}
      />
    </>
  );
}
```

**Props:**

- `isOpen`: boolean
- `onClose`: () => void
- `onConfirm`: `(payload: { title: string; file: File }) => Promise<void>`

**States:**

1. **Idle**: Shows form with title input and file upload button
2. **Loading**: Shows progress bar with Cancel button
3. **Success**: Shows success message with Done button

## Hooks

### useUploadPost

Upload hook stub (ready for backend integration).

```tsx
import { useUploadPost } from '@/lib/hooks/useUploadPost';

function MyComponent() {
  const { upload } = useUploadPost();

  const handleUpload = async (file: File) => {
    await upload({
      title: 'My Post',
      file,
      onProgress: percent => {
        console.log(`${percent}% uploaded`);
      },
    });
  };
}
```

## Styling

### Theme Colors

- `brand.primary`: `#0d6efd` (Primary brand color)
- `brand.green`: `#D8F34E`
- `brand.black`: `#000000`
- `brand.white`: `#FFFFFF`
- `semantic.error`: `#E53E3E`

### Focus States

All form inputs use a semi-transparent primary color focus ring:

```css
box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.3);
```

### Error States

- Border color: `semantic.error`
- Helper text color: `semantic.error`
- Font size: `sm`

### Disabled States

- Background: `brand.gray.100`
- Opacity: `0.6`
- Cursor: `not-allowed`

## Accessibility

All components include:

- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Semantic HTML
- Screen reader support

## Testing

Component tests are located in the same directory with `.test.tsx` extension. Run tests with:

```bash
# Will be added when vitest is configured
```

## Examples

See `/src/components/examples/` for complete usage examples.
