int greenPin = 2;
int bluePin = 4;
int redPin = 6;

int redState = LOW;
int blueState = LOW;
int greenState = LOW;

void setup() {
  pinMode(redPin, INPUT);
  pinMode(bluePin, INPUT);
  pinMode(greenPin, INPUT);
  Serial.begin(9600);

}

void loop() {
  redState = digitalRead(redPin);
  blueState = digitalRead(bluePin);
  greenState = digitalRead(greenPin);
  delay(200);
  if (redState == HIGH){
    Serial.println("Red Pill");
  }
  if (blueState == HIGH){
    Serial.println("Blue Pill");
  }
  if (greenState == HIGH){
    Serial.println("Green Pill");
  }
}
