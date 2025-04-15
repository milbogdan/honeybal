package com.example.backend_app.global.config.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.queue.name}")
    private String queueName;

    @Value("${rabbitmq.exchangeName}")
    private String exchangeName;

    @Value("${rabbitmq.routingKey}")
    private String routingKey;

    //spring bean for queue
    @Bean
    public Queue queue() {
        return new Queue(queueName);
    }

    //spring bean for exchange
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchangeName);
    }

    //bindinw between queue and exchange using routing key
    @Bean
    public Binding binding() {
        return BindingBuilder.bind(queue()).to(exchange()).with(routingKey);
    }
}
