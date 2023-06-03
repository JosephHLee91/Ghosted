package learn.ghosted.data;

import learn.ghosted.models.Resource;

import java.util.List;

public interface ResourceRepository {
    List<Resource> findAll();

    Resource findById(int resourceId);

    Resource add(Resource resource);

    boolean update(Resource resource);

    boolean deleteById(int resourceId);
}
