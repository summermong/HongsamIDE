package was.backwas.member.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import was.backwas.member.domain.LoginMemberResponse;
import was.backwas.member.domain.Member;
import was.backwas.member.domain.MemberResponse;
import was.backwas.member.repository.MemberRepository;
import was.backwas.member.service.S3Service;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/mypage")
public class MemberInfoController {

    private final S3Service s3Service;
    private final MemberRepository memberRepository;

    // 프로필 사진 수정
    @PostMapping("/members/profile-img")
    public MemberResponse updateProfileImg(@RequestParam("profileImg") MultipartFile multipartFile,
    @SessionAttribute(value = "loginMember", required = false) LoginMemberResponse loginMember) throws IOException {

        if (loginMember == null) {
            return new MemberResponse(400, "로그인 유저 정보 없음");
        }

        Member member = memberRepository.findMemberByEmailOne(loginMember.getEmail());

//         s3에 파일 올리기
        String imgUrl = s3Service.uploadFiles(member.getUuid(), multipartFile, "image");

        return new MemberResponse(200,imgUrl);
    }

}
