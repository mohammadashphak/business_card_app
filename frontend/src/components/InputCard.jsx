import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

const InputCard = (props) => {
  const [card, setCard] = useState({
    name: "",
    description: "",
    interests: [""],
    socialMedias: [{ name: "", url: "" }],
  });

  function handleInterestInputChange(e, index) {
    let newInterests = [...card.interests];

    newInterests[index] = e.target.value;
    setCard({ ...card, interests: newInterests });
  }

  const handleSocialNameInputChange = (e, index) => {
    let newsocialMedias = [...card.socialMedias];

    newsocialMedias[index].name = e.target.value;

    setCard({ ...card, socialMedias: newsocialMedias });
  };

  function handleSocialUrlInputChange(e, index) {
    let newSocialMedias = [...card.socialMedias];

    newSocialMedias[index].url = e.target.value;
    setCard({ ...card, socialMedias: newSocialMedias });
  }
  return (
    <div className="flex justify-center mb-8">
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle>Create New Card</CardTitle>
          <CardDescription>
            Fill all the input fields and press create button to create a new
            card.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            props.addCard(e, card);
            setCard({
              name: "",
              description: "",
              interests: [""],
              socialMedias: [{ name: "", url: "" }],
            });
          }}
        >
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {/* name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required={true}
                  value={card.name}
                  onChange={(e) => {
                    setCard({ ...card, name: e.target.value });
                  }}
                />
              </div>

              {/* description*/}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter your description"
                  required={true}
                  value={card.description}
                  onChange={(e) => {
                    setCard({ ...card, description: e.target.value });
                  }}
                />
              </div>

              {/* interest */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Interests</Label>
                {card.interests.map((interest, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      className="w-[80%] inline-flex mr-2"
                      id="interest"
                      name="interest"
                      placeholder="Enter your interest"
                      required={true}
                      value={interest}
                      onChange={(e) => {
                        handleInterestInputChange(e, index);
                      }}
                    />
                    <Button
                      variant="destructive"
                      type="button"
                      className="w-max[10%]"
                      onClick={() => {
                        const newInterests = [...card.interests];
                        newInterests.splice(index, 1);
                        setCard({ ...card, interests: newInterests });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setCard({ ...card, interests: [...card.interests, ""] });
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Social Medias */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Social Media</Label>
                {card.socialMedias.map((socialMedia, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      className="w-[40%] inline-flex mr-1"
                      id="socialMediaName"
                      name="socialMediaName"
                      placeholder="Enter your Social Media Name"
                      required={true}
                      value={socialMedia.name}
                      onChange={(e) => {
                        handleSocialNameInputChange(e, index);
                      }}
                    />
                    <Input
                      type="text"
                      className="w-[40%] inline-flex mr-2"
                      id="socialMediaUrl"
                      name="socialMediaUrl"
                      placeholder="Enter your Social Media Url"
                      required={true}
                      value={socialMedia.url}
                      onChange={(e) => {
                        handleSocialUrlInputChange(e, index);
                      }}
                    />
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => {
                        const newSocialMedias = [...card.socialMedias];
                        newSocialMedias.splice(index, 1);
                        setCard({ ...card, socialMedias: newSocialMedias });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setCard({
                        ...card,
                        socialMedias: [
                          ...card.socialMedias,
                          { name: "", url: "" },
                        ],
                      });
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setCard({
                  name: "",
                  description: "",
                  interests: [""],
                  socialMedias: [{ name: "", url: "" }],
                });
              }}
            >
              Clear
            </Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default InputCard;
