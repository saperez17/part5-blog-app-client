import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { BlogItem } from './BlogItem'

describe('<BlogItem/> ', () => {
    let likeEventHandler = jest.fn()
    let deleteEventHandler = jest.fn()
    const blog = {
        title: 'test title',
        author: 'test author',
        id: '1234',
        likes: '1234',
        url: 'test url'
    }
    let component
    beforeEach(() => {
        component = render(
            <BlogItem
                blogInfo={blog}
                likeBlogPost={likeEventHandler}
                deleteBlog={deleteEventHandler}
            />
        )
    })
    test('Renders blog title and author, but not url o likes', () => {
        const titleAuthorDiv = component.container.querySelector('.headerInfo')
        const urlLikesDiv = component.container.querySelector('.bodyInfo')

        expect(titleAuthorDiv).toHaveTextContent(blog.title)
        expect(titleAuthorDiv).toHaveTextContent(blog.author)
        expect(urlLikesDiv).toHaveStyle('display: none')
    })

    test('url and likes are shown when clicking button', () => {
        const urlLikesDiv = component.container.querySelector('.bodyInfo')
        expect(urlLikesDiv).toHaveStyle('display: none')

        const button = component.getByText('view')
        fireEvent.click(button)
        expect(urlLikesDiv).not.toHaveStyle('display: none')
    })

    test('like button works', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(likeEventHandler.mock.calls).toHaveLength(2)
    })
})