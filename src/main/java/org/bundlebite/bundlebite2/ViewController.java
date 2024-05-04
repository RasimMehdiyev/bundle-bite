import org.bundlebite.bundlebite2.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// redirect to SPA index.html
@Controller
public class ViewController {

    @GetMapping(value = {"/{path:[^\\.]*}"})
    public String redirect() {
        System.out.println("Forwarding to index.html");
        return "forward:/index.html";
    }

}

