describe('Blog app', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users',{
            username: 'santiago',
            password: '0000'
        })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function(){
        cy.contains('Log in to application')
        // cy.contains('Username')
        cy.get('input.usernameInput')
        cy.get('#userPassword')
        cy.contains('login')
    })

    describe('Login', function(){
        it('succeeds with correct credentials', function(){
            cy.contains('Log in to application')
            // cy.contains('Username')
            cy.get('input.usernameInput')
                .type('santiago')
            cy.get('#userPassword')
                .type('0000')
            cy.contains('login').click()
            cy.contains('santiago logged in')
        })

        it('fails with wrong credentials', function(){
            cy.contains('Log in to application')
            // cy.contains('Username')
            cy.get('input.usernameInput')
                .type('santiago')
            cy.get('#userPassword')
                .type('000')
            cy.contains('login').click()
            cy.contains('Wrong Credetendials')
            cy.get('.feedbackNotification')
                .should('have.css', 'color', 'rgb(132, 32, 41)')
        })
    })

    describe('When logged in', function(){
        beforeEach(function(){
            cy.login({ username:'santiago', password:'0000' })
        })

        it('A blog can be created', function(){
            cy.contains('create new blog').click()
            cy.get('#titlefield').type('test title')
            cy.get('#autor').type('test title')
            cy.get('#urlfield').type('test title')
            cy.contains('Create').click()
            cy.contains(`A new blog ${'test title'} has been added`)
            cy.contains('test')
        })

        describe('And a blog exists', function(){
            beforeEach(function(){
                const blog = {
                    title: 'test title',
                    author: 'test author',
                    url: 'url test'
                }
                cy.createBlog(blog)
                cy.visit('http://localhost:3000')
            })
            it('user can like a blog', function(){
                cy.get('.likesNumber').should('contain', '0')
                cy.contains('view').click()
                cy.contains('like').click()
                cy.get('.likesNumber').should('contain', '1')
            })
            it('blog creator can delete blog', function(){
                cy.contains('view').click()
                cy.contains('delete').click()
                cy.contains('Blog post test title successfully deleted')
            })
        })
        describe('and several blogs exist', function(){
            const sourceBlogs = [
                { title: 'test title1', author:'test author1', url:'test url1', likes:2 },
                { title: 'test title2', author:'test author2', url:'test url3', likes:1 },
                { title: 'test title3', author:'test author2', url:'test url3', likes:0 }
            ]
            beforeEach(function(){
                cy.createBlog(sourceBlogs[0])
                cy.createBlog(sourceBlogs[1])
                cy.createBlog(sourceBlogs[2])
                cy.visit('http://localhost:3000')
            })

            it.only('blogs are ordered in desc by likes',function(){
                cy.get('div.blogItemWrapper')
                    .then(blogs => {
                        blogs.map((k,i) => {
                            cy.wrap(i).find('h3.blogTitle').should('contain', sourceBlogs[k].title)
                        })
                    })
            })
        })
    })

})