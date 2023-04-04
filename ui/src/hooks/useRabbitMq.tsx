const amqp = require('amqplib');

async function connect(queueName) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        console.log('Connected to RabbitMQ: ', queueName);
        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
    }
}

export async function subscribe(queueName, callback) {
    const channel = await connect(queueName);
    channel.consume(queueName, (message) => {
        const content = message.content;
        callback(channel, content); // sending channel object to the callback so the acknowledgement can be called later.
        // channel.ack(message); # on acknowledge what does it do ? does it flush the message out of the queue?
    });
}