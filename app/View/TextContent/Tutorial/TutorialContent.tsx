import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import mainmenuSrc from '../../../Images/howtoplay/mainscreen.png';
import codeditorSrc from '../../../Images/howtoplay/codeeditor.png';
import levelobjectivesSrc from '../../../Images/howtoplay/levelobjectives.png';
import gamecanvasSrc from '../../../Images/howtoplay/gamecanvas.png';
import storyboardSrc from '../../../Images/howtoplay/storyboard.png';

const TutorialContent = () => {
    return (

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>

            <Card>
                <CardHeader>
                    <CardTitle>Introduction to Coding</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{marginBottom: "25px"}}>
                        Coding is the process of using a programming language to get a computer to behave how you
                        want it to. Each line of code tells the computer to do something, and a document full of
                        lines of code is called a script. A set of scripts is a program.
                    </p>

                    <Image src={mainmenuSrc} alt={'Main Screen Image'} className={'image'}/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Introduction to Visual Coding</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        Visual coding is a way of programming where you manipulate program elements graphically
                        rather than by specifying them textually. It is often used in educational tools for teaching
                        programming concepts and can make learning to code more intuitive.
                    </p>

                    <Image src={codeditorSrc} alt={'Main Screen Image'} className={'image'}/>

                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>If Statements</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        An if statement is a conditional statement that runs a block of code if its condition is
                        true. It&apos;s a fundamental concept in programming used to make decisions.
                    </p>
                    <pre>
            <code>
              {`if (condition) {
  // code to be executed if the condition is true
}`}
            </code>
          </pre>
                    <Image src={levelobjectivesSrc} alt={'Main Screen Image'} className={'image'}/>

                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>For Loops</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        A for loop is a control flow statement for specifying iteration, which allows code to be
                        executed repeatedly. The for loop is typically used when the number of iterations is known
                        before entering the loop.
                    </p>
                    <pre>
            <code>
              {`for (initialization; condition; increment) {
  // code to be executed
}`}
            </code>
          </pre>
                    <Image src={gamecanvasSrc} alt={'Main Screen Image'} className={'image'}/>

                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Variables</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        Variables are used to store information to be referenced and manipulated in a computer
                        program. They also provide a way of labeling data with a descriptive name, so our programs
                        can be understood more clearly by the reader and ourselves.
                    </p>
                    <pre>
            <code>
              {`var name = "John"; // Declare and initialize a variable`}
            </code>
          </pre>
                    <Image src={storyboardSrc} alt={'Main Screen Image'} className={'image'}/>

                </CardContent>
            </Card>
        </div>
    );
};

export default TutorialContent;
