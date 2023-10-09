package was.backwas.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import was.backwas.member.domain.*;
import was.backwas.member.repository.MemberRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberResponse signup(Member member) {

        // 컨테이너 연결을 위한 uuid 생성
        member.setUuid(UUID.randomUUID().toString());
        member.setProfileUrl("https://hongsam-ide-user.s3.ap-northeast-2.amazonaws.com/default.webp");

        memberRepository.save(member);

        if (member.getId() == null) {
            return new MemberResponse(400, "회원가입 실패");
        }
        return new MemberResponse(200, "회원가입 성공");
    }

    public MemberResponse emailCheck(String email) {

        List<Member> member = memberRepository.findMemberByEmail(email);

        if (member.isEmpty()) {
            return new MemberResponse(200, "사용 가능한 이메일 입니다.");
        } else {
            return new MemberResponse(400, "이미 사용중인 이메일 입니다.");
        }
    }

    public LoginMemberResponse login(LoginDto loginDto) {

        // 이메일에대한 회원 정보가 없을 때 (존재하지 않는 회원)
        if (memberRepository.findMemberByEmail(loginDto.getEmail()).isEmpty()) {
            return null;
        }

        // 비밀번호 틀릴 때
        if (memberRepository.findPasswordByEmail(loginDto.getEmail()).getPassword().equals(loginDto.getPassword())) {
            Member member = memberRepository.findPasswordByEmail(loginDto.getEmail());
            LoginMemberResponse loginMemberResponse = new LoginMemberResponse();
            loginMemberResponse.setUsername(member.getUsername());
            loginMemberResponse.setEmail(member.getEmail());
            loginMemberResponse.setProfileUrl(member.getProfileUrl());

            return loginMemberResponse;

        } else {
            return null;
        }
    }


    public MemberResponse getUUID(String email) {

        String uuid = memberRepository.findPasswordByEmail(email).getUuid();
        log.info("uuid = {}", uuid);

        return new MemberResponse(200, uuid);

    }

    @Transactional
    public MemberResponse updateMemberInfo(LoginMemberResponse loginMember, String username, String password) {

        Member member = memberRepository.findMemberByEmailOne(loginMember.getEmail());

        if (username != null && username.trim().isEmpty()) {
            // null X, 빈 문자열 왔을 때
            return new MemberResponse(401, "username이 빈 문자열 입니다.");
        } else if (username != null) {
            if (member.getUsername().equals(username)) {
                return new MemberResponse(403, "기존의 이름과 동일합니다.");
            }
            // db update
            member.setUsername(username);
            // 세션 정보 변경
            loginMember.setUsername(username);
        }

        if (password != null && password.trim().isEmpty()) {
            return new MemberResponse(401, "password가 빈 문자열 입니다.");
        } else if (password != null) {
            if (member.getPassword().equals(password)) {
                return new MemberResponse(402, "기존의 비밀번호와 동일합니다.");
            }
            member.setPassword(password);
        }

        return new MemberResponse(200, loginMember);
    }

    public MemberResponse checkPassword(String password, String email) {

        Member member = memberRepository.findMemberByEmailOne(email);

        log.info("db에서 꺼낸 비밀번호={}",member.getPassword());

        if (member.getPassword().equals(password)) {
            return new MemberResponse(200, "비밀번호 일치 확인");
        } else {
            return new MemberResponse(400, "비밀번호가 일치하지 않습니다.");
        }
    }
}
