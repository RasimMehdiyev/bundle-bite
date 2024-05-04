package org.bundlebite.bundlebite2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.context.annotation.ComponentScan;


@ComponentScan(basePackages = {"org.bundlebite.bundlebite2"})
@SpringBootApplication
public class BundleBite2Application {

	public static void main(String[] args) {
		SpringApplication.run(BundleBite2Application.class, args);
	}

}
