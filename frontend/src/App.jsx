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
import { DialogFooter } from "./components/ui/dialog";

function App() {
  const [cards, setCards] = useState([]);

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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="p-16 flex flex-wrap justify-evenly">
        {cards.map((card) => (
          <Card key={card._id} className="w-[350px] m-5">
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
                  <Button key={index} variant="default" className="m-1">
                    <a href={socialMedia.url} target="_blank">
                      {socialMedia.name}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between">
              <Button variant="secondary">Edit</Button>
              <Dialog>
                <DialogTrigger>
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
    </>
  );
}

export default App;
