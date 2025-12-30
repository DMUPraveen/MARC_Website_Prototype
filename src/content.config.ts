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


const publications = defineCollection({
    loader: file('src/publication_collection/publications.json'),
    schema: z.object({
        paper_title: z.string(),
        venue: z.string(),
        type: z.string(),
        doi: z.string().url(),
        authors: z.array(z.string()),
        publication_date: z.string().date(),
        people: z.array(z.string().email()),
        project: z.string()
    })
});
// 5. Export a single `collections` object to register your collection(s)
export const collections = { projects, people, publications };