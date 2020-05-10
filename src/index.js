import { GraphQLServer } from "graphql-yoga"

// Scalar types - String, Boolean, int Float, ID

// Demo User Data

const users = [{
    id: '1',
    name: 'kadu',
    email: 'kadu@example.com',
    age: 27
    }, {
    id: '2',
    name: 'Sarah',
    email: 'Sarah@example.com',
    },{
    id: '3',
    name: 'Mike',
    email: 'Mike@example.com',
    age: 27
    }
]

// Type definitions (schema)
const typeDefs = `
    type Query{
        users(query: String): [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`
// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query){
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase)
            }) 
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@teste.com',
            }
        },
        post() {
            return {
                id: '081',
                title: 'GraphQL 101',
                body: 'Learning GraphQL',
                published: true
            }
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('this server is up!')
})