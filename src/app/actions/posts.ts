'use server'

import { revalidatePath } from 'next/cache'
import { createRelatedPost } from '@/lib/api'

export async function createRelatedPostAction(formData: FormData) {
    const post = await createRelatedPost(formData)

    revalidatePath('/')
    revalidatePath('/posts')

    return post
}