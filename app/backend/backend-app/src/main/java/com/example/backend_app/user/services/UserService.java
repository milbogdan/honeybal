package com.example.backend_app.user.services;

import com.example.backend_app.auth.services.JwtService;
import com.example.backend_app.global.exception.ExceptionBadRequest;
import com.example.backend_app.global.exception.ExceptionNotFound;
import com.example.backend_app.global.exception.ExceptionUnauthorized;
import com.example.backend_app.user.DTOs.EditUserDTO;
import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.mappers.UserMapper;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final JwtService jwtService;


    public UserDTO getUserFromToken(String token) {
        String username = jwtService.extractUsername(token);
        return userMapper.usertoUserDTO(userRepository.findByEmail(username).orElseThrow(() -> new ExceptionNotFound("User not found!")));
    }

    public Page<UserDTO> getAll(int page, int pageSize,String search,Boolean isVerified) {
        Pageable pageable = PageRequest.of(page,pageSize);
        Page<User> users = userRepository.findAllSearchAndFilters(search,pageable,isVerified);
        List<UserDTO> userDTOS = userMapper.usertoUserDTOs(users.getContent());
        return new PageImpl<>(userDTOS, pageable, users.getTotalElements());
    }

    public UserDTO getById(Long id) {
        return userMapper.usertoUserDTO(userRepository.findById(id).orElseThrow(() -> new ExceptionNotFound("User not found!")));
    }

    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public UserDTO editUser(EditUserDTO editUserDTO, Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ExceptionNotFound("User not found!"));
        UserDetails currentUserDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser=userRepository.findByEmail(currentUserDetails.getUsername()).orElseThrow(() -> new ExceptionUnauthorized("Not authorized!"));
        if(!user.getId().equals(currentUser.getId())){
            throw new ExceptionUnauthorized("You are not allowed to edit this User!");
        }
        if(editUserDTO.getUsername()!=null){
            if(!isUsernameTaken(editUserDTO.getUsername())){
                user.setUsername(editUserDTO.getUsername());
            }
            else {
                throw new ExceptionBadRequest("Username already taken!");
            }
        }
        if(editUserDTO.getAddress()!=null){
            user.setAddress(editUserDTO.getAddress());
        }
        if(editUserDTO.getFirstName()!=null){
            user.setFirstName(editUserDTO.getFirstName());
        }
        if(editUserDTO.getLastName()!=null){
            user.setLastName(editUserDTO.getLastName());
        }
        userRepository.save(user);
        return userMapper.usertoUserDTO(user);
    }
}
