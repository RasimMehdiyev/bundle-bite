package org.bundlebite.bundlebite2;

import java.util.List;

import org.bundlebite.bundlebite2.utils.HomepageUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomepageController {

    @GetMapping("/publicApi/homepageMeals")
    public List<Meal> getMealsForHomepage(){
        return HomepageUtil.getMealsForHomepage();
    }    
}
