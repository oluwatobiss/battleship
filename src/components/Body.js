import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import GameButton from "./GameButton";

function Body() {
    return (
        <div>
            <section>
                <p>This is the message board</p>
            </section>
            <section>
                <UsersGridArea />
                <ComputersGridArea />
            </section>
            <section>
                <GameButton />
            </section>
        </div>
    );
}

export default Body;