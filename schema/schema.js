const Organization = require('../models/organization');
const User = require('../models/user');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a book written by an organization',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        first_name: { type: GraphQLNonNull(GraphQLString) },
        last_name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        employee_id: { type: GraphQLNonNull(GraphQLString) },
        organization_name: { type: GraphQLNonNull(GraphQLString) },
        organization: {
            type: new GraphQLList(OrganizationType),
            resolve: () => Organization.find({})

        }
    })
})

const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    description: 'This represents a organization of a user',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        users: {
            type: new GraphQLList(UserType),
            resolve: (organization) => {
                // return users.filter(user => user.organization_name === organization.name)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'List of All Users',
            // return User.find({})
            resolve: () => User.find({})
        },
        organizations: {
            type: new GraphQLList(OrganizationType),
            description: 'List of All organizations',
            // return Organization.findById(parent.organization_name)
            resolve: () => Organization.find({})
        }
    })

})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addUser: {
            type: UserType,
            description: 'Add a user',
            args: {
                first_name: { type: GraphQLNonNull(GraphQLString) },
                last_name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                employee_id: { type: GraphQLNonNull(GraphQLString) },
                organization_name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                let user = new User({ first_name: args.first_name, last_name: args.last_name, email: args.email, password: args.password, organization_name: args.organization_name, employee_id: args.employee_id })
                return user.save();
            }
        },
        addOrganization: {
            type: OrganizationType,
            description: 'Add an organization',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                let organization = new Organization({
                    name: args.name
                });
                return organization.save();
            }
        }
    })
})


module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});
