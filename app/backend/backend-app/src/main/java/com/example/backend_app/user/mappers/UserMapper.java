package com.example.backend_app.user.mappers;

import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO usertoUserDTO(User user);
}
