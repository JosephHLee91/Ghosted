package learn.ghosted.models;

public class Testimonial {
  private int testimonial_id;
  private String testimonial_review;
  private int testimonial_rating;
  private int user_id;

  public int getTestimonial_id() {
    return testimonial_id;
  }

  public void setTestimonial_id(int testimonial_id) {
    this.testimonial_id = testimonial_id;
  }

  public String getTestimonial_review() {
    return testimonial_review;
  }

  public void setTestimonial_review(String testimonial_review) {
    this.testimonial_review = testimonial_review;
  }

  public int getTestimonial_rating() {
    return testimonial_rating;
  }

  public void setTestimonial_rating(int testimonial_rating) {
    this.testimonial_rating = testimonial_rating;
  }

  public int getUser_id() {
    return user_id;
  }

  public void setUser_id(int user_id) {
    this.user_id = user_id;
  }
}
