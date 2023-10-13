package ide.backide;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//
@SpringBootApplication(exclude = {
                org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration.class,
        })
public class BackIdeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackIdeApplication.class, args);
	}

}
