const { app } = require('@azure/functions');

app.http('GetCounter', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // Real-world: You would fetch this from Cosmos DB here
        const visitorCount = 42; 
        return { 
            body: JSON.stringify({ count: visitorCount }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
});
