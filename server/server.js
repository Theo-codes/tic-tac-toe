const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", ws => {
    ws.on("message", msg => {
        const data = JSON.parse(msg);
        // Broadcast all messages
        wss.clients.forEach(c => {
            if (c.readyState === WebSocket.OPEN) {
                c.send(JSON.stringify(data));
            }
        });
    });
});

console.log("WebSocket server running on ws://localhost:3000");
