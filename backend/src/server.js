 // ncc adds this file at the app root (aka __dirname) 
const fs = require('fs');
const path = require('path'); 
const {importSchema} = require('graphql-import');
fs.readFileSync(path.join(__dirname, "/prisma.graphql"))
const typeDefs = importSchema(path.join(__dirname, "/schema.graphql"));