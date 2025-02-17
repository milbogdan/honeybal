package com.example.backend_app.user.mappers;

import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface UserMapper {
    UserDTO usertoUserDTO(User user);
    List<UserDTO> usertoUserDTOs(List<User> users);
}
