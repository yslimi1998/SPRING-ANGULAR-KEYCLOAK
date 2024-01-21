package net.slimi.customerservice;

import net.slimi.customerservice.entities.Customer;
import net.slimi.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CustomerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(CustomerRepository customerRepository){

		return args -> {
			Customer customer1 =Customer.builder()
					.name("youness")
					.email("youness@gmail.com")
					.build();

			Customer customer2 =Customer.builder()
					.name("anouar")
					.email("anouar@gmail.com")
					.build();
			customerRepository.save(customer1);
			customerRepository.save(customer2);

		};
	}
}
