package com.C10G14.WorldFitBackend.mapper;

import com.C10G14.WorldFitBackend.dto.RegisterRequestDto;
import com.C10G14.WorldFitBackend.entity.Role;
import com.C10G14.WorldFitBackend.entity.User;
import com.C10G14.WorldFitBackend.enumeration.ERole;
import com.C10G14.WorldFitBackend.enumeration.ESex;
import com.C10G14.WorldFitBackend.repository.RoleRepository;
import com.C10G14.WorldFitBackend.util.DtoFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Component
public class AuthDtoMapper {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    DtoFormatter formatter;

    public User requestToEntity(RegisterRequestDto registerRequestDto){
        List<Role> roles = new ArrayList<Role>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(()-> new RuntimeException("Role USER not found"));
        roles.add(userRole);

        ESex sex = (Objects.equals(registerRequestDto.getSex(),null)) ? ESex.NOT_SPECIFIED :
                (registerRequestDto.getSex().equalsIgnoreCase("male"))?  ESex.MALE : ESex.FEMALE;

        return User.builder()
                .email(registerRequestDto.getEmail().toLowerCase())
                .password(passwordEncoder.encode(registerRequestDto.getPassword()))
                .name(formatter.formatName(registerRequestDto.getName()))
                .profileImg(null)
                .sex(sex)
                .age(registerRequestDto.getAge())
                .height(registerRequestDto.getHeight())
                .weight(registerRequestDto.getWeight())
                .role(roles)
                .build();
    }

}
