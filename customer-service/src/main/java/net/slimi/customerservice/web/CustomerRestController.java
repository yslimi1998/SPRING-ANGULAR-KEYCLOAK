package net.slimi.customerservice.web;
import net.slimi.customerservice.entities.Customer;
import net.slimi.customerservice.repository.CustomerRepository;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class CustomerRestController {
    private CustomerRepository customerRepository;


    public CustomerRestController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    @GetMapping("/customers")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Customer> customerList(){
        return customerRepository.findAll();
    }

    @GetMapping("/customers/{id}")
    public Customer customerById(@PathVariable Long id) {
        return customerRepository.findById(id).get();
    }



    //pour voir les roles etc ...
    @GetMapping("/mySession")
    public Authentication authentication(Authentication authentication){
        return authentication;
    }
}


