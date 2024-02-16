import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose, DialogFooter } from "./components/ui/dialog";
import InputCard from "./components/InputCard";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import Header from "./components/Header";

function App() {
  const [cards, setCards] = useState([]);
  const [editCardState, setEditCardState] = useState({
    name: "",
    description: "",
    interests: [""],
    socialMedias: [{ name: "", url: "" }],
  });

  // fetch data
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("http://localhost:3000/getcards");
        const data = await res.json();

        if (res.status === 200) {
          setCards(data);
        } else {
          toast(`${data.error}`, {
            description: new Date().toLocaleString(),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  // inputs change for edit card
  function handleInterestInputChange(e, index) {
    let newInterests = [...editCardState.interests];

    newInterests[index] = e.target.value;
    setEditCardState({ ...editCardState, interests: newInterests });
  }

  const handleSocialNameInputChange = (e, index) => {
    let newsocialMedias = [...editCardState.socialMedias];

    newsocialMedias[index].name = e.target.value;

    setEditCardState({ ...editCardState, socialMedias: newsocialMedias });
  };

  function handleSocialUrlInputChange(e, index) {
    let newSocialMedias = [...editCardState.socialMedias];

    newSocialMedias[index].url = e.target.value;
    setEditCardState({ ...editCardState, socialMedias: newSocialMedias });
  }

  // add card
  const addCard = async (e, card) => {
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:3000/addcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast(`${data.msg}`, {
          description: new Date().toLocaleString(),
        });
        setCards([...cards, card]);
      } else {
        toast(`${data.error}`, {
          description: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update card
  const updateCard = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch("http://localhost:3000/updatecard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCardState),
      });

      const data = await res.json();

      if (res.status === 200) {
        setEditCardState({
          name: "",
          description: "",
          interests: [""],
          socialMedias: [{ name: "", url: "" }],
        });

        setCards(
          cards.map((card) =>
            card._id === editCardState._id ? (card = editCardState) : card
          )
        );
        toast(`${data.msg}`, {
          description: new Date().toLocaleString(),
        });
      } else {
        toast(`${data.error}`, {
          description: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete card
  const deleteCard = async (_id) => {
    try {
      const res = await fetch("http://localhost:3000/deletecard", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });

      const data = await res.json();
      if (res.status === 200) {
        toast(`${data.msg}`, {
          description: new Date().toLocaleString(),
        });
        setCards(cards.filter((card) => card._id !== _id));
      } else {
        toast(`${data.error}`, {
          description: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-14">
        <InputCard
          addCard={addCard}
          handleInterestInputChange={handleInterestInputChange}
          handleSocialNameInputChange={handleSocialNameInputChange}
          handleSocialUrlInputChange={handleSocialUrlInputChange}
        />

        {/* Show Cards */}
        <div className="flex flex-wrap justify-evenly">
          {cards.map((card, index) => (
            <Card key={index} className="w-[350px] m-5">
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h6 className="scroll-m-20 text-md font-semibold tracking-tight">
                  Interests
                </h6>
                <ul className="ml-6 list-disc [&>li]:mt-2">
                  {card.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  {card.socialMedias.map((socialMedia, index) => (
                    <Button key={index} variant="secondary" className="m-1">
                      <a href={socialMedia.url} target="_blank">
                        {socialMedia.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between">
                {/* Edit Card Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    {/* Edit Button */}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditCardState(card);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle>Edit Card</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        updateCard(e);
                      }}
                    >
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
                            value={editCardState.name}
                            onChange={(e) => {
                              setEditCardState({
                                ...editCardState,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>

                        {/* description*/}
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter your description"
                            required={true}
                            value={editCardState.description}
                            onChange={(e) => {
                              setEditCardState({
                                ...editCardState,
                                description: e.target.value,
                              });
                            }}
                          />
                        </div>

                        {/* interest */}
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="interests">Interests</Label>
                          {editCardState.interests.map((interest, index) => (
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
                                  const newInterests = [
                                    ...editCardState.interests,
                                  ];
                                  newInterests.splice(index, 1);
                                  setEditCardState({
                                    ...editCardState,
                                    interests: newInterests,
                                  });
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
                                setEditCardState({
                                  ...editCardState,
                                  interests: [...editCardState.interests, ""],
                                });
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>

                        {/* Social Medias */}
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="socialMedias">Social Media</Label>
                          {editCardState.socialMedias.map(
                            (socialMedia, index) => (
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
                                    const newSocialMedias = [
                                      ...editCardState.socialMedias,
                                    ];
                                    newSocialMedias.splice(index, 1);
                                    setEditCardState({
                                      ...editCardState,
                                      socialMedias: newSocialMedias,
                                    });
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            )
                          )}
                          <div>
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => {
                                setEditCardState({
                                  ...editCardState,
                                  socialMedias: [
                                    ...editCardState.socialMedias,
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
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit">Save changes</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Delete button with confirmation */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Do you really want to delete this card?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <Button onClick={() => deleteCard(card._id)}>
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
