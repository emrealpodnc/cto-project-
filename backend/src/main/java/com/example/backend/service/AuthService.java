package com.example.backend.service;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import com.example.backend.dto.request.LoginRequestDTO;
import com.example.backend.dto.response.LoginResponseDTO;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    public AuthService(AuthenticationManager authenticationManager,
                   JwtService jwtService,
                   UserRepository userRepository) {

    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
    this.userRepository = userRepository;
}
   public LoginResponseDTO login(LoginRequestDTO dto) {

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    dto.getKullaniciAdi(),
                    dto.getSifre()
            )
    );

    User user = userRepository.findByKullaniciAdi(dto.getKullaniciAdi())
            .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));

    String token = jwtService.generateToken(user.getKullaniciAdi());

    LoginResponseDTO response = new LoginResponseDTO();
    response.setToken(token);
    response.setKullaniciAdi(user.getKullaniciAdi());
    response.setRol(user.getRol().name());
    response.setKullaniciId(user.getId());
    return response;
}
}