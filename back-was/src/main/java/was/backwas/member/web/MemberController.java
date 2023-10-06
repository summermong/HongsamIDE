package was.backwas.member.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import was.backwas.member.domain.*;
import was.backwas.member.service.MemberService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

  // 회원가입
    @PostMapping("/signup")
    public MemberResponse signup(@RequestBody Member member) {
        return memberService.signup(member);
    }

    // 이메일 중복 체크
    // 문제점 : emailCheck 한 후 통과 후 다른 사용자가 동일 이메일 입력한 경우 (나중에 생각)
    @PostMapping("/signup/email-check")
    public MemberResponse emailCheck(@RequestBody EmailCheckDto emailCheckDto) {
        return memberService.emailCheck(emailCheckDto.getEmail());
    }

    // 로그인
    @PostMapping("/login")
    public MemberResponse login(@RequestBody LoginDto loginDto, HttpServletRequest request, HttpServletResponse response) {

        LoginMemberResponse loginMember = memberService.login(loginDto);

        if (loginMember == null) {
            return new MemberResponse(400, "아이디 또는 비밀번호가 맞지 않습니다.");
        }

        HttpSession session = request.getSession();
        session.setAttribute("loginMember", loginMember);


        Cookie cookie = new Cookie("JSESSIONID", session.getId());
        cookie.setDomain("hong-sam.online");
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        log.info("일반 유저 세션 생성");
        log.info("sessionId={}", session.getId());
        session.getAttributeNames().asIterator()
                .forEachRemaining(name -> log.info("session name={}, value={}", name, session.getAttribute(name)));

        return new MemberResponse(200, loginMember);
    }

    // 로그아웃
    @PostMapping("/logout")
    public MemberResponse logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("loginMember") == null) {
            log.info("로그아웃 실패");
            return new MemberResponse(400,"로그아웃 실패");
        }
        session.invalidate();
        log.info("로그아웃 성공");
        return new MemberResponse(200,"로그아웃 성공");
    }
}
