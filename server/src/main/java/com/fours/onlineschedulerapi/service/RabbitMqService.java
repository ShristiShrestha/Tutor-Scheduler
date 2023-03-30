package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.RabbitMqConstant;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeoutException;

@Service
public class RabbitMqService {

    private static final Logger logger = LoggerFactory.getLogger(RabbitMqService.class);

    @Autowired
    private ConnectionFactory connectionFactory;

    public void createQueue(String queueName) {

        try (Connection connection = connectionFactory.newConnection();
              Channel channel = connection.createChannel()) {

            channel.queueDeclare(queueName, false, false, false, null);

        } catch (IOException | TimeoutException e) {
            logger.error("Error while creating queue: " + queueName);
            logger.error(e.getMessage());
        }
    }

    public void sendMessage(String message, String queueName, Map<String, Object> headers) {
        try (Connection connection = connectionFactory.newConnection();
              Channel channel = connection.createChannel()) {

            AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
                    .headers(headers)
                    .build();

            channel.basicPublish("", queueName, props, message.getBytes(RabbitMqConstant.UTF_8));
        } catch (IOException | TimeoutException e) {
            logger.error("Error while sending message to queue: " + queueName);
            logger.error(e.getMessage());
        }
    }
}
