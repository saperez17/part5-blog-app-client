import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm  from './BlogForm'

describe('<BlogForm />', () => {
    test('Updates parent state and calls onSubmit', () => {
        const blogObject = {
            title: 'test title',
            author: 'test author',
            url: 'test url'
        }
        const createBlog = jest.fn()
        const component = render(
            <BlogForm
                handleBlogSubmit={createBlog}
            />
        )
        const inputTitle = component.container.querySelector('#titlefield')
        const inputUrl = component.container.querySelector('#urlfield')
        const inputAuthor = component.container.querySelector('#autor')
        const form = component.container.querySelector('form')

        fireEvent.change(inputTitle, {
            target: { value: blogObject.title }
        })
        fireEvent.change(inputAuthor, {
            target: { value: blogObject.author }
        })
        fireEvent.change(inputUrl, {
            target: { value: blogObject.url }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe(blogObject.title)
        expect(createBlog.mock.calls[0][0].autor).toBe(blogObject.author)
        expect(createBlog.mock.calls[0][0].url).toBe(blogObject.url)
    })
})