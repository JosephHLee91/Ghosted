package learn.ghosted.data;

import learn.ghosted.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String email);

    @Transactional
    AppUser create(AppUser user);

    @Transactional
    void update(AppUser user);
}
