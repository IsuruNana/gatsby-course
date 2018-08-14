/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 const path = require('path');

 exports.createPages = ({boundActionCreaters, graphql}) => {
   const { createPage } = boundActionCreaters

   const postTemplate = path.resolve('src/templates/blog-post.js');

   return graphql(`
    {
      allMarkdownRemark 
      {
        edges 
        {
          node 
          {
            id            
            frontmatter 
            {
              path
              title
              date
              author
            }
          }
        }
      }
    }
   `).then(res => {
      if(res.errors){
        return Promise.reject(res.errors)
      }

      res.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
          path: node.frontmatter.path,
          component: postTemplate
        })
      })
   })
 }