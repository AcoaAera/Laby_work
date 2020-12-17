var kafka = require("kafka-node"),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(client, [{ topic: "test", partition: 0 }], {
        autoCommit: true 
    });

consumer.on("message", function (message) {
    console.log("consumer 2");
    console.log(message);
});