package learn.ghosted.domain;

import learn.ghosted.data.TestimonialRepository;
import learn.ghosted.models.Testimonial;
import learn.ghosted.models.TestimonialUser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialService {
  private final TestimonialRepository repository;

  public TestimonialService(TestimonialRepository repository) {
    this.repository = repository;
  }

  public Testimonial findById(int testimonial_id){
    return repository.findById(testimonial_id);
  }

  public List<Testimonial> findAll() {
    return repository.findAll();
  }

  public List<TestimonialUser> findAllWithUser() {
    return repository.findAllWithUser();
  }

  public List<Testimonial> findByUserId(int user_id){
    return repository.findByUserId(user_id);
  }

  public Result<Testimonial> add(Testimonial testimonial){
    Result<Testimonial> result = validate(testimonial);
    if(!result.isSuccess()){
      return result;
    }

    if(testimonial.getTestimonial_id() != 0){
      result.addMessage("Testimonial ID cannot be set when adding testimonials", ResultType.INVALID);
    }

    testimonial = repository.add(testimonial);
    result.setPayload(testimonial);
    return result;
  }
  private Result<Testimonial> validate(Testimonial testimonial) {
    Result<Testimonial> result = new Result<>();

    if(testimonial == null) {
      result.addMessage("Testimonial cannot be null", ResultType.INVALID);
    }

    if(Validations.isWithInStringRange(testimonial.getTestimonial_review())){
      result.addMessage("Message must be between 10 and 600 characters", ResultType.INVALID);
    }

    if(testimonial.getTestimonial_rating() < 1 || testimonial.getTestimonial_rating() > 5){
      result.addMessage("Rating must be between 1 and 5", ResultType.INVALID);
    }

    return result;
  }
}
