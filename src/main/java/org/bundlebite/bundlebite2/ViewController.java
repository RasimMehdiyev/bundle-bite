package org.bundlebite.bundlebite2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class ViewController {

    private static final Logger logger = LoggerFactory.getLogger(ViewController.class);

    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        logger.info("URL entered directly into the Browser, so we need to redirect...");
        return "forward:/index.html";
    }
    // if /api/** is requested, return json data from OrdersController.java
    @GetMapping("/api/**")
    public String api() {
        return "forward:/api/orders";
    }
}

