package was.backwas.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import was.backwas.member.domain.LoginDto;
import was.backwas.member.domain.LoginMemberResponse;
import was.backwas.member.domain.Member;
import was.backwas.member.domain.MemberResponse;
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
}
