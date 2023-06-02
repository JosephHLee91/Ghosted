package learn.ghosted.controllers;

import learn.ghosted.domain.Result;
import learn.ghosted.domain.TestimonialService;
import learn.ghosted.models.Testimonial;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/testimonial")
public class TestimonialController {
  private final TestimonialService service;

  public TestimonialController(TestimonialService service) {
    this.service = service;
  }

  @GetMapping
  public List<Testimonial> findAll() {
    return service.findAll();
  }

  @GetMapping("/{testimonial_id}")
  public ResponseEntity<Testimonial> findById(@PathVariable int testimonial_id) {
    Testimonial testimonial = service.findById(testimonial_id);

    if (testimonial == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return ResponseEntity.ok(testimonial);
  }

  @GetMapping("/user/{user_id}")
  public ResponseEntity<List> findByUserId(int user_id) {
    List<Testimonial> testimonial = service.findByUserId(user_id);

    if (testimonial == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return ResponseEntity.ok(testimonial);
  }

  @PostMapping
  public ResponseEntity<Object> add(@RequestBody Testimonial testimonial){
    Result<Testimonial> result = service.add(testimonial);

    if(result.isSuccess()) {
      return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }
    return ErrorResponse.build(result);
  }
}
