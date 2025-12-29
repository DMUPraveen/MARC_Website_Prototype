// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)
const projects = defineCollection({
    loader: glob(
        {
            pattern: "**/*.md",
            base: "src/project_collection/"
        }
    ),
    schema: ({ image }) => z.object({
        project: z.string(),
        projectMembers: z.array(z.string()),
        supervisors: z.array(z.string()),
        researchArea: z.string(),
        researchPillars: z.array(z.string()),
        coverImage: image()
    })

});

const people = defineCollection({
    loader: glob(
        {
            pattern: "**/*.md",
            base: "src/people_collections/"
        }
    ),
    schema: ({ image }) => z.object({
        email: z.string().email(),
        post: z.string(),
        name: z.string(),
        photo: image().optional(),
    })

});
// 5. Export a single `collections` object to register your collection(s)
export const collections = { projects, people };