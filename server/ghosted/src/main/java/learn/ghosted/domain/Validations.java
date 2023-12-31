package learn.ghosted.domain;

public class Validations {

  public static boolean isNullOrBlank(String value) {
    return value == null || value.isBlank();
  }

  public static boolean isWithInStringRange(String value){
    return value.length() < 10 || value.length() > 600;
  }

}
