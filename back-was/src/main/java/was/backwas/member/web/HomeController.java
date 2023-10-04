package was.backwas.member.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import was.backwas.member.domain.LoginMemberResponse;
import was.backwas.member.domain.Member;
import was.backwas.member.domain.MemberResponse;
import was.backwas.member.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final MemberService memberService;

    @GetMapping("/")
    public MemberResponse home(HttpServletRequest request, @SessionAttribute(value = "loginMember", required = false) LoginMemberResponse loginMemberResponse) {

        HttpSession session = request.getSession(false);

        if (session == null || loginMemberResponse == null) {
            return new MemberResponse(400, "로그인 정보 없음");
        }

        return new MemberResponse(200, loginMemberResponse);
    }

    // 코드편집기 접근 uuid 반환
    @GetMapping("/question/{questionId}")
    public MemberResponse getUUID(HttpServletRequest request, @SessionAttribute(value = "loginMember", required = false)
    LoginMemberResponse loginMemberResponse, @PathVariable("questionId") String questionId) {

        HttpSession session = request.getSession(false);

        if (session == null || loginMemberResponse == null) {
            return new MemberResponse(400, "로그인 정보 없음");
        }

        return memberService.getUUID(loginMemberResponse.getEmail());

    }
}
