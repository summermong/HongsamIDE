package ide.backide.service;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class RestTemplateService {

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean ownerCheck(HttpServletRequest request, String uuid) {
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("JSESSIONID")) {
                String value = cookie.getValue();
                String apiUrl = "https://api.hong-sam.online/checkowner";

                UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                        .queryParam("JSESSIONID", value);
                String uriStringWithParam = builder.toUriString();

                ResponseEntity<String> responseEntity = restTemplate.getForEntity(uriStringWithParam, String.class);

                String body = responseEntity.getBody();
                if (body.equals(uuid)) {
                    return true;
                }
            }
        }
        return false;
    }

}
