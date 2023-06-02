package learn.ghosted.data;

import learn.ghosted.models.Testimonial;

import java.util.List;

public interface TestimonialRepository {
  Testimonial findById(int testimonial_id);

  List<Testimonial> findAll();

  List<Testimonial> findByUserId(int user_id);

  Testimonial add(Testimonial testimonial);
}
