import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import mainmenuSrc from '../../../../app/Images/howtoplay/mainscreen.png';
import codeditorSrc from '../../../../app/Images/howtoplay/codeeditor.png';
import levelobjectivesSrc from '../../../../app/Images/howtoplay/levelobjectives.png';
import gamecanvasSrc from '../../../../app/Images/howtoplay/gamecanvas.png';
import storyboardSrc from '../../../../app/Images/howtoplay/storyboard.png';

const TutorialContent = () => {
    return (

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>

            <Card>
                <CardHeader>
                    <CardTitle>🎯 Objective</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        The main goal of the game is to navigate the character (which appears to be a robot or a similar
                        entity) to collect items on the grid, such as apples or coins.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🖥️ Game Interface</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li><strong>Grid Area (Left Side):</strong> This is where the character moves around. Items like
                            apples, coins, and other objects are placed on this grid.
                        </li>
                        <li><strong>Code Editor (Right Side):</strong> This is where you write the code to control the
                            character’s movements and actions.
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🔀 Basic Movements</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li><strong>Step Up:</strong> Moves the character one step up.</li>
                        <li><strong>Step Down:</strong> Moves the character one step down.</li>
                        <li><strong>Step Left:</strong> Moves the character one step to the left.</li>
                        <li><strong>Step Right:</strong> Moves the character one step to the right.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🔢 Variables</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li><strong>Increment:</strong> Increases the value of a variable.</li>
                        <li><strong>Decrement:</strong> Decreases the value of a variable.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🎮 Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Collect:</strong> Collects an item from the grid.</p>
                    <p><strong>Drop:</strong> Drops an item on the grid.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🔀 Control Flow Statements</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li><strong>If:</strong> Executes a block of code only if a specified condition is true.</li>
                        <li><strong>For:</strong> Repeats a block of code a certain number of times.</li>
                        <li><strong>Just Execute:</strong> Executes a block of code without any condition.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>📋 Example Steps to Play</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Write Code:</strong> Drag and drop the movement commands and actions into the code editor
                        to form a sequence of steps for the character.</p>
                    <p><strong>Execute Code:</strong> Click on the “Play Code” button to execute the written code and
                        see the character perform the actions on the grid.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>📄 Sample Code</CardTitle>
                </CardHeader>
                <CardContent>
                <pre>
                    <code>
                        {`Step Down
Step Down
Step Left
Collect Item`}
                    </code>
                </pre>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>💡 Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>Plan your movements by looking at the position of the character and the items on the grid.
                        </li>
                        <li>Use variables to keep track of the number of steps or conditions if needed.</li>
                        <li>Use control flow statements to handle complex movements and decisions.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🏆 Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>By writing and executing the correct sequence of commands, you can successfully navigate the
                        character through the grid and achieve the objectives of each level.</p>
                </CardContent>
            </Card>

            <Image src={mainmenuSrc} alt={'Main Screen Image'} className={'image'}/>
            <Image src={codeditorSrc} alt={'Code Editor Image'} className={'image'}/>
            <Image src={levelobjectivesSrc} alt={'Level Objectives Image'} className={'image'}/>
            <Image src={gamecanvasSrc} alt={'Game Canvas Image'} className={'image'}/>
            <Image src={storyboardSrc} alt={'Storyboard Image'} className={'image'}/>
        </div>
    );
};

export default TutorialContent;
