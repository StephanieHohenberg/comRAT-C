import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {ComponentInteractionService} from '../../../services/component-interaction.service';
import {Subscription} from 'rxjs/index';
import {GraphData} from '../../../models/graph.data';
import * as cytoscape from 'cytoscape';
import * as cxtmenu from 'cytoscape-cxtmenu';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {InformationDialogComponent} from '../../information-dialog/information-dialog.component';

cytoscape.use(cxtmenu);

@Component({
  selector: 'app-cytoscape-graph',
  templateUrl: './cytoscape-graph.component.html',
  styleUrls: ['./cytoscape-graph.component.css']
})
export class CytoscapeGraphComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public elements: GraphData;
  private layout: any;
  private style: any;
  private menuConfig: any;
  private inputWordsChangedSubscription: Subscription;
  private cy;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  public constructor(private componentInteractionService: ComponentInteractionService,
                     private renderer: Renderer2, private el: ElementRef, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initializeGraphConfiguration();
    this.render();
    this.inputWordsChangedSubscription = this.componentInteractionService.getInputWordsChangedObservable().subscribe(() => {
      this.render();
    });
  }

  public ngOnDestroy(): void {
    if (this.inputWordsChangedSubscription) {
      this.inputWordsChangedSubscription.unsubscribe();
    }
  }

  public openInformationDialog(ele) {
    console.log(ele.id());
    const config = new MatDialogConfig();
    const dialogRef: MatDialogRef<InformationDialogComponent> = this.dialog.open(InformationDialogComponent, config);
    dialogRef.componentInstance.id = ele.id();
  }


  public ngOnChanges(): any {
    this.render();
  }

  public render() {
    const cy_container = this.renderer.selectRootElement('#cy');
    const localselect = this.select;
    this.cy = cytoscape({
      container: cy_container,
      layout: this.layout,
      minZoom: 0.1,
      maxZoom: 1.5,
      style: this.style,
      elements: this.elements,
    });

    let menu = this.cy.cxtmenu(this.menuConfig);

    /**
     cy.on('tap', 'node', function(e) {
      let node = e.target;
      let neighborhood = node.neighborhood().add(node);

      cy.elements().addClass('faded');
      neighborhood.removeClass('faded');
      localselect.emit(node.data('name'));
    });

     cy.on('tap', function(e) {
      if (e.target === cy) {
        cy.elements().removeClass('faded');
      }
    }); **/
  }

  private initializeGraphConfiguration(): void {
    this.layout = {
      name: 'cose',
      //      rankDir: 'LR',
      directed: true,
      padding: 0
    };

    this.style = cytoscape.stylesheet()
      .selector('node')
      .css({
        'shape': 'circle',
        'width': 'data(weight)',
        'height': 'data(weight)',
        'content': 'data(label)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(colorCode)',
        'background-color': 'data(colorCode)',
        'color': '#fff',
        'font-size': 10
      })
      .selector(':selected')
      .css({
        'border-width': 1,
        'border-color': 'black'
      })
      .selector('edge')
      .css({
        'curve-style': 'bezier',
        'opacity': 0.8,
        'width': '2',
        'line-color': 'grey',
        'target-arrow-color': 'grey',
        'target-arrow-shape': 'triangle'
      })
      .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      });

    this.menuConfig = {
      selector: 'node',
      commands: [
        {
          content: "<i class='fas fa-location-arrow'></i></br>select",
          select: function (ele) {
            console.log(ele.id());
          },
          enabled: true
        },
        {
          content: "<i class='fas fa-info-circle'></i></br>information",
          select: (ele) => this.openInformationDialog(ele),
          enabled: true
        },
        {
          content: "<i class='far fa-star'></i></br>track",
          select: function (ele) {
            console.log(ele.id());
          },
          enabled: true
        },
      ],
      menuRadius: 100, // the radius of the circular menu in pixels
      activeFillColor: 'black', // the colour used to indicate the selected command
      activePadding: 20, // additional size in pixels for the active command
      indicatorSize: 0, // the size in pixels of the pointer to the active command
      separatorWidth: 3, // the empty spacing in pixels between successive commands
      spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
      openMenuEvents: 'click', //  that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: 'white', // the colour of text in the command's content
      itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
      atMouse: false // draw menu at mouse position
    };
  }


}
